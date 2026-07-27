import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';
import { StudentService } from '../../../core/services/student.service';
import { QuizService } from '../../../core/services/quiz.service';

@Component({
  selector: 'app-course-player',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-player.component.html',
  styleUrl: './course-player.component.scss'
})
export class CoursePlayerComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);
  private studentService = inject(StudentService);

  courseId: string | null = null;
  activeVideoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4';
  activeLessonTitle = 'Introducción';
  activeTab = 'descripcion';

  course: any = {
    title: 'Cargando curso...',
    instructor: '',
    syllabus: [
      { 
        module: 'Módulo 1: Introducción', 
        lessons: [
          { title: 'Introducción al curso', duration: '10:05', isCompleted: true, locked: false, active: true },
          { title: 'Configuración inicial', duration: '15:20', isCompleted: false, locked: false, active: false }
        ] 
      }
    ]
  };

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.courseService.getCourseById(Number(this.courseId)).subscribe({
        next: (realCourse) => {
          if (realCourse) {
            this.course.title = realCourse.title;
            this.course.instructor = realCourse.instructor?.profile?.firstName || 'Instructor';
            
            if (realCourse.modules && realCourse.modules.length > 0) {
              this.course.syllabus = realCourse.modules;
            } else if (realCourse.syllabus && realCourse.syllabus.length > 0) {
              this.course.syllabus = realCourse.syllabus;
            }

            // Setear la primera lección como activa por defecto
            if (this.course.syllabus[0] && this.course.syllabus[0].lessons && this.course.syllabus[0].lessons.length > 0) {
              this.activeLessonTitle = this.course.syllabus[0].lessons[0].title;
              this.activeVideoUrl = this.course.syllabus[0].lessons[0].videoUrl || this.activeVideoUrl;
              this.course.syllabus[0].lessons[0].active = true;
            }
            
            // Inscribir al alumno en DB y recuperar su progreso
            this.studentService.enrollCourse(Number(this.courseId)).subscribe({
              next: (enrollment) => {
                this.course.progress = enrollment.progress;
                this.course.isCompleted = enrollment.isCompleted;
                this.restoreProgress(enrollment.progress);
              },
              error: () => console.error('Error al matricular')
            });
          }
        },
        error: (err) => console.error('Error cargando curso', err)
      });
    }
  }

  restoreProgress(progress: number) {
    let completedLessonsCount = 0;
    let totalLessons = 0;

    this.course.syllabus.forEach((mod: any) => {
      mod.lessons.forEach((l: any) => {
        totalLessons++;
      });
    });

    const targetCompleted = Math.round((progress / 100) * totalLessons);

    this.course.syllabus.forEach((mod: any) => {
      mod.lessons.forEach((l: any) => {
        if (completedLessonsCount < targetCompleted) {
          l.isCompleted = true;
          completedLessonsCount++;
        }
      });
    });
  }



  markCurrentLessonCompleted() {
    let totalLessons = 0;
    let completedLessons = 0;
    let currentLesson: any = null;

    this.course.syllabus.forEach((mod: any) => {
      mod.lessons.forEach((l: any) => {
        totalLessons++;
        if (l.active) {
          l.isCompleted = true;
          currentLesson = l;
        }
        if (l.isCompleted) completedLessons++;
      });
    });

    const progressPercentage = Math.round((completedLessons / totalLessons) * 100);
    this.course.progress = progressPercentage;
    this.course.isCompleted = progressPercentage >= 100;

    if (this.courseId) {
      this.studentService.updateProgress(Number(this.courseId), progressPercentage).subscribe();
    }
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  // Lógica de Quiz
  private quizService = inject(QuizService);
  activeQuiz: any = null;
  quizAnswers: any = {};
  quizResult: any = null;

  loadQuizForLesson(lessonId: number) {
    this.activeQuiz = null;
    this.quizResult = null;
    this.quizAnswers = {};
    
    this.quizService.getQuizByLesson(lessonId).subscribe({
      next: (quiz) => {
        this.activeQuiz = quiz;
      },
      error: () => {
        this.activeQuiz = null; // No hay quiz
      }
    });
  }

  playLesson(lesson: any) {
    if (lesson.locked) return;
    
    // Quitar active de todas
    this.course.syllabus.forEach((mod: any) => {
      mod.lessons.forEach((l: any) => l.active = false);
    });
    
    lesson.active = true;
    this.activeLessonTitle = lesson.title;
    if (lesson.videoUrl) {
      this.activeVideoUrl = lesson.videoUrl;
    }

    if (lesson.id) {
      this.loadQuizForLesson(lesson.id);
    }
  }

  selectAnswer(questionId: number, answerId: number) {
    this.quizAnswers[questionId] = answerId;
  }

  submitQuiz() {
    if (!this.activeQuiz) return;
    const answers = Object.values(this.quizAnswers) as number[];
    this.quizService.submitQuiz(this.activeQuiz.id, answers).subscribe({
      next: (res) => {
        this.quizResult = res;
        if (res.passed) {
          this.markCurrentLessonCompleted();
        }
      },
      error: (err) => console.error(err)
    });
  }
}
