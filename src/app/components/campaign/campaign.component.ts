import { Component, OnInit } from '@angular/core';

import { CampaignService } from '../../services/campaign/campaign.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss'],
})
export class CampaignComponent implements OnInit {
  isDataLoaded: boolean = false;
  name: string = '';
  uuid: string = '';
  logo: string = '';
  website: string = '';
  code: string = '';
  email: string = '';
  phone: string = '';

  constructor(private CampaignService: CampaignService) {}

  ngOnInit(): void {
    this.gerCampaignData();
  }

  gerCampaignData() {
    this.CampaignService.getCampaign()
      .then((result: any) => {
        this.isDataLoaded = true;
        this.name = result.name;
        this.uuid = result.uuid;
        this.logo = result.logo;
        this.website = result.website;
        this.code = result.code;
        this.email = result.email;
        this.phone = result.phone;
      })
      .catch((err) => {
        console.log('Some thing went wrong');
        console.log(err);
      });
  }
}
