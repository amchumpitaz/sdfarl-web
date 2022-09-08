import { map } from 'rxjs/operators';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../shared/auth/auth.service';
import { Observable, of, Subject } from 'rxjs';

// export function verifyExistEmail(authService: AuthService): AsyncValidatorFn {
//   return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
//     return authService.verifyEmail(control.value).pipe(
//       map(data => {
//         return data.type === 'SUCCESS' ? null : { verifyEmail: true };
//       })
//     );
//   };
// }
