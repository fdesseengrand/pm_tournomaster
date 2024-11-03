import {
  Injectable
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Authentication guard.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { }
