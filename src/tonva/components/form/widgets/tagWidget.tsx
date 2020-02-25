import * as React from 'react';
import classNames from 'classnames';
import { Widget } from './widget';
import { UiTag } from '../../schema';
import { RowContext } from '../context';

//const radioStyle:React.CSSProperties = {height: 'auto'};

abstract class TagWidget extends Widget {
    protected inputs: {[index:number]: HTMLInputElement} = {};
    protected get ui(): UiTag {return this._ui as UiTag};

    protected setElementValue(value:any) {
        for (let i in this.inputs) {
            let input = this.inputs[i];
            input.checked = value === input.value;
        }
    }
    setReadOnly(value:boolean) {
        this.readOnly = value;
        for (let i in this.inputs) this.inputs[i].readOnly = value;
    }
    setDisabled(value:boolean) {
        this.disabled = value;
        for (let i in this.inputs) this.inputs[i].disabled = value
	}
	
	//protected abstract renderItem(item: TagListItem, index:number, widgetName:string):JSX.Element;

	abstract render():JSX.Element;
}

export class TagSingleWidget extends TagWidget {
	render() {
		let {valuesView} = this.ui;
		if (valuesView === undefined) return <>valuesView must be defined</>;
        let {isRow} = this.context;
        let rowKey:number;
        if (isRow === true) {
            rowKey = (this.context as RowContext).rowKey;
        }
        let cn = classNames(this.className, 'py-0');
		let name = this.name;
		if (rowKey !== undefined) name += '-' + rowKey;
		let options = {
			className: cn,
			inputName: name,
			onInputChange: this.onInputChange
		}
		return valuesView.renderRadios(this.defaultValue, options);
		/*
		<div className={cn} style={radioStyle}>
			<div className="row row-cols-3 row-cols-sm-4 row-cols-md-5">
                {list.map((v,index) => {
					return this.renderItem(v, index, name);
                })}
			</div>
		</div>;
		*/
    }
	/*
	protected renderItem(item: TagListItem, index:number, widgetName:string):JSX.Element {
		let {id, name, ext} = item;
		return <div key={index} className="col"><label key={index} className="form-radio-inline">
			<input ref={input=>this.inputs[index]=input} type="radio" name={widgetName}
				value={id} defaultChecked={this.defaultValue===id}
				onChange={this.onInputChange} />
			{name}
		</label></div>;
	}*/
}

export class TagMultiWidget extends TagWidget {
	private defaultArr:number[];
	init() {
		super.init();
		let def = this.defaultValue;
		switch (typeof def) {
			default:
				this.defaultArr = [];
				break;
			case 'string':
				this.defaultArr = def.split('|').map(v => Number(v));
				break;
		}
	}
    protected onInputChange = (evt: React.ChangeEvent<any>) => {
		let values:string[] = [];
		for (let i in this.inputs) {
			let input = this.inputs[i];
			if (input.checked === true) values.push(input.value);
		}
        this.changeValue(values.join('|'), true);
	}
	/*
	protected renderItem(item: TagListItem, index:number, widgetName:string):JSX.Element {
		let {id, name, ext} = item;
		return <div key={index} className="col"><label key={index} className="form-radio-inline">
			<input ref={input=>this.inputs[index]=input} type="checkbox"
				value={id} defaultChecked={this.defaultArr.indexOf(id)>=0}
				onChange={this.onInputChange} />
			{name}
		</label></div>;
	}
	*/
	render() {
		let {valuesView} = this.ui;
		if (valuesView === undefined) return <>valuesView must be defined</>;
        let cn = classNames(this.className, 'py-0');
		let options = {
			className: cn,
			inputs: this.inputs,
			onInputChange: this.onInputChange
		}
		return valuesView.renderChecks(this.defaultValue, options);
		/*
		<div className={cn} style={radioStyle}>
			<div className="row row-cols-3 row-cols-sm-4 row-cols-md-5">
                {list.map((v,index) => {
					return this.renderItem(v, index, name);
                })}
			</div>
		</div>;
		*/
    }
}
