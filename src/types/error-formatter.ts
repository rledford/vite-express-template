import { ErrorResponseDto } from '@/dtos';
import { CustomError } from '@/errors';

export type ErrorFormatter = (error: Error | CustomError) => ErrorResponseDto;
