import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, InputTextModule],
    templateUrl: './login.component.html'
})
export class LoginComponent implements AfterViewInit, OnDestroy {
    @ViewChild('particleCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

    loginForm: FormGroup;
    loginFailed = false;

    private ctx!: CanvasRenderingContext2D;
    private particles: any[] = [];
    private animationFrameId: number = 0;
    private mouse = { x: -1000, y: -1000 };
    private colors = ['#00b4d8', '#f97316', '#1e3a8a', '#ffffff']; // Brand colors

    constructor(private fb: FormBuilder, private authService: AuthService) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    ngAfterViewInit() {
        this.initParticles();
    }

    ngOnDestroy() {
        cancelAnimationFrame(this.animationFrameId);
    }

    @HostListener('window:resize')
    onResize() {
        if (this.canvasRef) {
            this.canvasRef.nativeElement.width = window.innerWidth;
            this.canvasRef.nativeElement.height = window.innerHeight;
            this.initParticlesArray();
        }
    }

    @HostListener('document:mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        this.mouse.x = event.clientX;
        this.mouse.y = event.clientY;
    }

    @HostListener('document:mouseleave')
    onMouseLeave() {
        this.mouse.x = -1000;
        this.mouse.y = -1000;
    }

    private initParticles() {
        const canvas = this.canvasRef.nativeElement;
        this.ctx = canvas.getContext('2d')!;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        this.initParticlesArray();
        this.animate();
    }

    private initParticlesArray() {
        this.particles = [];
        const numParticles = Math.floor((window.innerWidth * window.innerHeight) / 10000);
        for (let i = 0; i < numParticles; i++) {
            this.particles.push(this.createParticle());
        }
    }

    private createParticle() {
        const canvas = this.canvasRef.nativeElement;
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 1.5,
            speedY: (Math.random() - 0.5) * 1.5,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            baseX: 0,
            baseY: 0
        };
    }

    private animate = () => {
        const canvas = this.canvasRef.nativeElement;
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];

            // Baseline movement
            p.x += p.speedX;
            p.y += p.speedY;

            // Bounce off edges
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

            // Mouse interaction
            const dx = this.mouse.x - p.x;
            const dy = this.mouse.y - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 150;

            if (distance < maxDistance) {
                // Move towards mouse
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (maxDistance - distance) / maxDistance;

                // Attract
                p.x += forceDirectionX * force * 2;
                p.y += forceDirectionY * force * 2;
            }

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();

            // Connect nearby lines
            for (let j = i; j < this.particles.length; j++) {
                let p2 = this.particles[j];
                const dx2 = p.x - p2.x;
                const dy2 = p.y - p2.y;
                const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                if (dist2 < 80) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 - (dist2 / 80) * 0.15})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }

        this.animationFrameId = requestAnimationFrame(this.animate);
    }

    onSubmit() {
        if (this.loginForm.valid) {
            const { email, password } = this.loginForm.value;
            const success = this.authService.login(email, password);
            if (!success) {
                this.loginFailed = true;
            }
        }
    }
}
