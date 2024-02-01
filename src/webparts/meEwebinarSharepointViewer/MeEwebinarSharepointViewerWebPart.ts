import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import styles from "./MeEwebinarSharepointViewerWebPart.module.scss";
import { SPHttpClient } from "@microsoft/sp-http";

export interface IMeEwebinarSharepointViewerWebPartProps {
  description: string;
}

export default class MeEwebinarSharepointViewerWebPart extends BaseClientSideWebPart<IMeEwebinarSharepointViewerWebPartProps> {
  public render(): void {
    this.domElement.innerHTML = `
    <div class="${styles.webinarViewer}" id="webinar-sharepoint-viewer"></div>
    `;
  }

  protected onInit() {
    setTimeout(async () => {
      await import(
        // @ts-ignore
        /*webpackIgnore: true*/ "https://martinservold.github.io/That-Open-Test/dist/assets/index-040e3dba.js"
      );

      window.dispatchEvent(new Event("resize"));
      await this.loadFirstFile();
    }, 1000);

    return new Promise<void>((resolve) => {
      console.log(styles);
      console.log("Hello world!");
      resolve();
    });
  }

  protected async loadFirstFile() {
    const docFiles = "_api/web/lists/GetByTitle('Documents')/Files";
    const baseUrl = this.context.pageContext.web.absoluteUrl;
    const url = `${baseUrl}/${docFiles}`;

    const http = this.context.spHttpClient;
    const config = SPHttpClient.configurations.v1;
    const response = await http.get(url, config);
    const documents = await response.json();

    console.log(documents);

    if (documents.value.length) {
      const firstDocument = documents.value[0].Url;
      const fetched = await fetch(firstDocument);
      const buffer = await fetched.arrayBuffer();
      const data = new Uint8Array(buffer);

      const event = new CustomEvent("thatOpen", {
        detail: {
          name: "openModel",
          payload: {
            name: "example",
            buffer: data,
          },
        },
      });

      window.dispatchEvent(event);
    }
  }
}
