import { Component, OnInit } from '@angular/core';

import { CampaignService } from '../../services/campaign/campaign.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss'],
})
export class CampaignComponent implements OnInit {
  campaignData: any = null;

  constructor(private CampaignService: CampaignService) {}

  ngOnInit(): void {
    this.gerCampaignData();
  }

  gerCampaignData() {
    this.CampaignService.getCampaign()
      .then((result) => {
        this.campaignData = result;
      })
      .catch((err) => {
        console.log('Some thing went wrong');
        console.log(err);
      });
  }
}
