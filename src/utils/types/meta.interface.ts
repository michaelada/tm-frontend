export enum FieldType {
    Text,
    TextArea,
    Number,
    SingleSelectList,
    MultSelectList,
}

export type IOption = {
    id: string;
    name: string;
}
export type IFieldDefinition = {
    name: string;
    fieldtype: FieldType;
    propertyname: String;
    options?: IOption[];
    defaultValue: string;
    resolver: (value:string) => boolean;
}

export type IFieldValue = {
    propertyname: string;
    value: any;
}

export type IFormProps = {
    onSubmit: Function;
    fields: IFieldDefinition[];
    values: IFieldValue[];
}

export type IField = {
    definition: IFieldDefinition;
    value: any;
}

