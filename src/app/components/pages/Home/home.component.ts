import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { NgFor, NgIf, NgClass} from "@angular/common";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [ReactiveFormsModule, NgFor, NgIf, NgClass],
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

    excelForm = new FormGroup({
        rows: new FormControl('20', [Validators.required, Validators.min(this.row_min)]),
        columns: new FormControl('30', [Validators.required, Validators.min(this.column_min), Validators.max(this.column_max)]),
    })

    rows = 0;
    columns = 0;
    colors = 0;
    color_names = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Grey', 'Brown', 'Black', 'Teal'];
    active_colors = [''];
    table: number[][] = [];
    excelTable: {isHeader: boolean; value: string; isCorner?: boolean}[][]=[];

    handleSubmit() {
        this.rows = Number(this.colorForm.value.rows);
        this.columns = Number(this.colorForm.value.columns);
        this.colors = Number(this.colorForm.value.colors);

        this.generateSelectionTable();
    }


    handleExcelSubmit() {
        const r = Number(this.excelForm.value.rows);
        const c = Number(this.excelForm.value.columns);

        if(c > 702) {
            alert("Maximum column limit is 702 (Column ZZ");
            return;
        }
        this.excelTable = [];

        for (let i = 0; i <= r; i++) {
            const row: { isHeader: boolean; value: string; isCorner?: boolean }[] = [];
            for (let j = 0; j <= c; j++) {
                if (i === 0 && j === 0) {
                    row.push({ isHeader: true, value: '', isCorner: true });
                } else if (i === 0) {
                    row.push({ isHeader: true, value: this.getExcelColumn(j - 1) });
                } else if (j === 0) {
                    row.push({ isHeader: true, value: i.toString() });
                } else {
                    row.push({ isHeader: false, value: '' });
                }
            }
            this.excelTable.push(row);
        }
    }

    getExcelColumn(n: number): string {
        let name = '';
        while(n >= 0) {
            name = String.fromCharCode((n % 26) + 65) + name;
            n = Math.floor(n/26)-1;
        }
        return name;
    }


    onCellClick(row: number, col: number) {
        if(row > 0 && col > 0) {
            const colName = this.getExcelColumn(col - 1);
            alert(`${colName}${row}`);
        }
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
