import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { NgFor, NgIf } from "@angular/common";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [ReactiveFormsModule, NgFor, NgIf],
})
export class HomeComponent {
    row_min = 1;
    row_max = 1000;

    column_min = 1;
    column_max = 702;
    
    color_min = 1;
    color_max = 10;
    
    colorForm = new FormGroup({
        rows: new FormControl('', [Validators.required, Validators.min(this.row_min), Validators.max(this.row_max)]),
        columns: new FormControl('', [Validators.required, Validators.min(this.column_min), Validators.max(this.column_max)]),
        colors: new FormControl('', [Validators.required, Validators.min(this.color_min), Validators.max(this.color_max)]),
    });

    rows = 0;
    columns = 0;
    colors = 0;
    color_names = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Grey', 'Brown', 'Black', 'Teal'];
    active_colors = [''];
    table: number[][] = [];

    handleSubmit() {
        this.rows = Number(this.colorForm.value.rows);
        this.columns = Number(this.colorForm.value.columns);
        this.colors = Number(this.colorForm.value.colors);

        this.generateSelectionTable();
    }

    generateSelectionTable() {
        this.table = [];

        for (let i = 0; i < this.colors; i++) {
            let row = [];
            row.push(Number(''));
            row.push(Number(''));
            
            this.table.push(row);
        }
    }

    addActiveColor(name: string) {
        this.active_colors.push(name);
    }

    isActive(name: string) {
        return this.active_colors.includes(name);
    }

}
