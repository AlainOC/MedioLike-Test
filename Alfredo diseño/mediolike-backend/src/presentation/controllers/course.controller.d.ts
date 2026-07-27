import { Request, Response } from 'express';
export declare class CourseController {
    static getAllCourses(req: Request, res: Response): Promise<void>;
    static getCourseById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static createCourse(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static enrollCourse(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static updateProgress(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=course.controller.d.ts.map