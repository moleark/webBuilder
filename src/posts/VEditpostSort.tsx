import * as React from "react";
import { consts } from "consts";
import { CPosts } from "./CPosts";
import { observer } from "mobx-react";
import { VPage, UiSchema, Schema, UiInputItem, Page, Form, Context } from "tonva";
import { observable } from "mobx";
/* eslint-disable */
export class VEditpostSort extends VPage<CPosts> {

	@observable private itempost: any;
	private form: Form;
	async open(param: any) {
		this.itempost = param
		this.openPage(this.page);
	}

	private onAdd = async () => {
		if (!this.form) return;
		await this.form.buttonClick("submit");
	}

	private onFormButtonClick = async (name: any, context: Context) => {
		let { sort } = context.form.data;
		let id = this.itempost.post;
		let param = { sort, id }
		await this.controller.addInformation(param);
		// this.closePage();
	}

	private uiSchema: UiSchema = {
		items: {
			sort: { widget: 'updown', label: this.t('排序') } as UiInputItem,
			submit: { widget: 'button', label: this.t('submit') }
		}
	};

	private schema: Schema = [
		{ name: 'sort', type: 'string', required: true },
	];

	private page = observer(() => {

		let right = <button type="button" onClick={this.onAdd} className="btn btn-sm btn-success mr-3">{this.t('submit')}</button>;
		return <Page header={this.t('贴文排序')} headerClassName={consts.headerClass} right={right}>
			<div className="mx-3">
				<Form ref={v => this.form = v} className="my-3"
					formData={this.itempost}
					schema={this.schema}
					uiSchema={this.uiSchema}
					onButtonClick={this.onFormButtonClick}
					requiredFlag={true}
				/>
			</div>
		</Page>
	})
}