import { SafeHtml } from '@angular/platform-browser';

export class Module {
    id_module: number;
    label: string;
    name: string;
    desc: string;
    icon: string;
}

export class Project {
    id_project: number;
    long_desc: string;
    name: string;
    short_desc: string;
    unique_id_project: string;
}

export class Program {
    id_program: number;
    title: string;
    short_desc: string;
    long_desc: string;
    html_short_desc: SafeHtml;
    html_long_desc: SafeHtml;
    image: string;
    logo: string;
    id_module: number;
    form_message: SafeHtml;
    module: Module;
    taxonomy_list: number;
    registration_required: boolean;
    on_sidebar: boolean;
    project: Project;
}
