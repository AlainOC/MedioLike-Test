import { Request, Response } from 'express';
export declare class UserController {
    static getAllUsers(req: Request, res: Response): Promise<void>;
    static updateUserRole(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static getMyEnrollments(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static updateProfile(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=user.controller.d.ts.map