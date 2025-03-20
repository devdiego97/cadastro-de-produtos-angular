
import { Component } from '@angular/core';
import { LayoutComponent } from '../../components/layout/layout.component';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ServicesToken } from '../../services.token';
import { HttpHeaders } from '@angular/common/http';
import { ProductsService } from '../../services/products/products.service';
import { IProduct } from '../../models/product';

@Component({
  selector: 'app-home',
  standalone: true, // Adicione isso se estiver usando Angular 17+
  imports: [LayoutComponent, FormsModule, ReactiveFormsModule, ToastModule, CommonModule],
  providers: [
    MessageService,
    { provide: ServicesToken.HTTP.PRODUCTS, useClass: ProductsService }, // Corrigido HTPP para HTTP
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  form: FormGroup;

  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder,
    private messageService: MessageService,
  ) {
    // Inicialização do formulário com validadores corretos
    this.form = this.fb.group({
      photo: ['', [Validators.required, Validators.minLength(5)]], // Array de validadores
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
      mark: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', Validators.required],
      quantity: ['', Validators.required],

    });
  }

  // Exibe mensagem de sucesso
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso!',
      detail: 'Pet cadastrado com sucesso.',
    });
  }

  // Exibe mensagem de erro
  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Ops!',
      detail: 'Preencha todos os campos corretamente.',
    });
  }

  // Método chamado ao enviar o formulário
  onSubmit() {
    if (this.form.valid) {
      const formData: Omit<IProduct, 'id'> = this.form.value;


      this.productsService.createnewProduct({
        name:formData.name,
        photo:formData.photo,
        mark:formData.mark,
        quantity:formData.quantity,
         description:formData.description,
        price:formData.price

      }).subscribe({
        next: (response) => {
          console.log('Resposta da API:', response);
          this.showSuccess();
          this.form.reset();
        },
        error: (err) => {
          console.error('Erro na requisição:', err);
          this.showError();
        },
      });
    } else {
      this.showError();
      this.form.markAllAsTouched();
    }
  }
  // Método para facilitar o acesso aos controles do formulário
  getFormControl(controlName: string) {
    return this.form.get(controlName);
  }
}
