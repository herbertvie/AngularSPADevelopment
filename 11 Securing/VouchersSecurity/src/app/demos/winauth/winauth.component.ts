import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-winauth",
  templateUrl: "./winauth.component.html",
  styleUrls: ["./winauth.component.css"]
})
export class WinAuthComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}

  user: string;

  ngOnInit() {
    this.useWinAuth();
  }

  useWinAuth() {
    this.httpClient
      .get("http://localhost:5000/api/authapi/getWinUser/")
      .subscribe(data => (this.user = `Current Windows User: ${data}`));
  }
}
