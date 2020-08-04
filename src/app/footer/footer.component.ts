import { Component, OnInit } from '@angular/core';
import { faPhoneAlt, faFax, faEnvelope, faEnvelopeOpen} from '@fortawesome/free-solid-svg-icons';
import { faGooglePlus, faFacebook, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  phone = faPhoneAlt;
  fax = faFax;
  envelope = faEnvelope;
  envelopeo = faEnvelopeOpen;
  google = faGooglePlus;
  facebook = faFacebook;
  linkedin = faLinkedin;
  youtube = faYoutube;
  twitter = faTwitter;

  constructor() { }

  ngOnInit(): void {
  }

}
