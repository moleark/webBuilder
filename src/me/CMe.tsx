import _ from 'lodash';
import { Context } from 'tonva';
import { CUqBase } from '../CBase';
import { VMe } from './VMe';

export class CMe extends CUqBase {
    protected async internalStart() {

    }
    tab = () => this.renderView(VMe);
}