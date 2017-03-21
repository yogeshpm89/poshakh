import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'stringImagesPipe'})
export class StringImagesPipe implements PipeTransform {
  transform(value: string, height: number, width: number): string {
    var output = "";
    var sArray = value.split(",");
    var style = "style='height: " + height + "px; width:" + width + "px;'";

    for (var i=0; i<sArray.length; i++) {
    	output = output + "<image src='" + sArray[i] + "' " + style + "/>";
    }
    debugger;
    return output;
  }
}
