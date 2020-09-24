export interface MenuModel {
    name: string;
    routerLink?: any;
    icon?: string;
    elements?: MenuModel[];
    action?: Function;
    access?: string;
}
