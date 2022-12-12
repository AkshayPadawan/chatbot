import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { USERS } from "./data";
import { Message, STATUSES } from "./models";
import { TestServiceService } from "./test-service.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "chatbotInitial";
  inputValue: string;
  responseValue: string;

  statuses = STATUSES;
  activeUser;
  users = USERS;
  expandStatuses = false;
  expanded = false;
  messageReceivedFrom = {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8r04LCak4zl1ujYmFV7L_rNH4x8GVlKlv2w&usqp=CAU",
    name: "Media bot",
  };

  @ViewChild("scrollMe", { static: true })
  private myScrollContainer: ElementRef;
  response: string;
  constructor(private service: TestServiceService) {}

  ngOnInit() {
    this.setUserActive(USERS[0]);
    this.scrollToBottom();
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  addNewMessage(inputField) {
    const val = inputField.value.trim();
    if (val.length) {
      this.activeUser.messages.push({ type: "sent", message: val });
      this.service.postUser({ chatData: val }).subscribe(
        (res) => {
          const value = JSON.stringify(res);
          this.response = res
            ? value.substring(1, value.length - 1)
            : "I did not understand you.";
          // this.activeUser.ws.send(
          //   JSON.stringify({
          //     id: this.activeUser.id,
          //     message: this.response,
          //   })
          // );
          this.activeUser.messages.push(new Message("replies", this.response));
          console.log(this.activeUser);
        },
        (error) => {
          this.response = "I did not understand you.";
        }
      );
    }
    inputField.value = "";
  }
  save() {}
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  setUserActive(user) {
    this.activeUser = user;
    //this.connectToWS();
  }

  connectToWS() {
    if (this.activeUser.ws && this.activeUser.ws.readyState !== 1) {
      this.activeUser.ws = null;
      this.activeUser.status = STATUSES.OFFLINE;
    }
    if (this.activeUser.ws) {
      return;
    }
    const ws = new WebSocket("wss://compute.hotelway.ai:4443/?token=TESTTOKEN");
    this.activeUser.ws = ws;
    ws.onopen = (event) => this.onWSEvent(event, STATUSES.ONLINE);
    ws.onclose = (event) => this.onWSEvent(event, STATUSES.OFFLINE);
    ws.onerror = (event) => this.onWSEvent(event, STATUSES.OFFLINE);
    ws.onmessage = (result: any) => {
      const data = JSON.parse(result.data);
      const userFound = this.users.find((u) => u.id === data.id);
      if (userFound) {
        userFound.messages.push(new Message("replies", this.response));
      }
    };
  }

  onWSEvent(event, status: STATUSES) {
    this.users.forEach((u) =>
      u.ws === event.target ? (u.status = status) : null
    );
  }
}
function heartbeat() {
  clearTimeout(this.pingTimeout);

  // Use `WebSocket#terminate()`, which immediately destroys the connection,
  // instead of `WebSocket#close()`, which waits for the close timer.
  // Delay should be equal to the interval at which your server
  // sends out pings plus a conservative assumption of the latency.
  this.pingTimeout = setTimeout(() => {
    this.terminate();
  }, 30000 + 1000);
}
