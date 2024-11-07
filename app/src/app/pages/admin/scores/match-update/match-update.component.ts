import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Match } from "../../../../shared/models/match.model";
import { DateStatusPipe } from "../../../../shared/pipes/date-status.pipe";

/**
 * The match update component.
 */
@Component({
  selector: "app-match-update",
  standalone: true,
  imports: [DateStatusPipe, ReactiveFormsModule],
  templateUrl: "./match-update.component.html",
  styleUrl: "./match-update.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchUpdateComponent {
  @Input() match!: Match;

  @Input() formGroup?: FormGroup;
}
