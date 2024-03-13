export interface IExceptionMessage {
   message: string;
   status_code?: number;
}

export interface IException {
   badRequestException(data: IExceptionMessage): void;
   internalServerErrorException(data?: IExceptionMessage): void;
   forbiddenException(data?: IExceptionMessage): void;
   UnauthorizedException(data?: IExceptionMessage): void;
}