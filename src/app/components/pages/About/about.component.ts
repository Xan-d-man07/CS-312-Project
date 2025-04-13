import { Component } from "@angular/core";
import { CardComponent } from "../../parts/card/card.component";

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss',
    imports: [CardComponent],
})
export class AboutComponent {
    kaden_name = 'Kaden';
    kaden_image = 'kaden-image.jpg';
    kaden_desc = 'I\'m Kaden, a Senior in Computer Science at CSU.\
                I\'m really into CyberSecurity and Software development and I like making cool stuff.';

}
