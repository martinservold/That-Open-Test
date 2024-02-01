import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import styles from './MeEwebinarSharepointViewerWebPart.module.scss';

export interface IMeEwebinarSharepointViewerWebPartProps {
  description: string;
}

export default class MeEwebinarSharepointViewerWebPart extends BaseClientSideWebPart<IMeEwebinarSharepointViewerWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
    <div>Hello world</div>
    `;
  }

  protected onInit(): Promise<void> {
    return new Promise<void>((resolve) =>{
      console.log(styles);
      console.log("HelloWorld!")
      resolve();
    });
  }
}