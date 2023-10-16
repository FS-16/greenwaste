class Login {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
    this.validateOnSubmit();
  }

  validateOnSubmit() {
    let self = this;
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      let error = 0;

      self.fields.forEach((field) => {
        const input = document.querySelector(`#${field}`);
        if (self.validateFields(input) == false) {
          error++;
        }
      });
      if (error == 0) {
        // LOGIN API HERE
        localStorage.setItem('auth', 1);
        this.form.submit();
      }
    });
  }

  validateFields(field) {
    if (field.value.trim() === '') {
      this.setStatus(
        field,
        `${field.previousElementSibling.innerText} Cannot be blank`,
        'error'
      );
      return false;
    } else {
      if (field.type == 'password') {
        if (field.value.length < 8) {
          this.setStatus(
            field,
            `${field.previousElementSibling.innerText} harus 8 karakter`,
            'error'
          );
          return false;
        } else {
          this.setStatus(field, null, 'Berhasil');
          return true;
        }
      } else {
        this.setStatus(field, null, 'Berhasil');
        return true;
      }
    }
  }

  setStatus(field, message, status) {
    const errorMsg = field.parentElement.querySelector('.error-message');

    if (status == 'Berhasil') {
      if (errorMsg) {
        errorMsg.innerText = '';
      }
      field.classList.remove('input-error');
    }
    if (status == 'error') {
      errorMsg.innerText = message;
      field.classList.add('input-error');
    }
  }
}

const form = document.querySelector('.login');

if (form) {
  const fields = ['username', 'password'];
  const validate = new Login(form, fields);
}

const auth = localStorage.getItem('auth', 1);
if (auth == 1) {
  document.getElementById('askQuestion').style.display = 'block';
  document.getElementById('myQuestion').style.display = 'block';
  document.getElementById('myParticipation').style.display = 'block';
  document.getElementById('login').style.display = 'none';
  document.getElementById('register').style.display = 'none';
} else {
  document.getElementById('askQuestion').style.display = 'none';
  document.getElementById('myQuestion').style.display = 'none';
  document.getElementById('myParticipation').style.display = 'none';
  document.getElementById('logout-button').style.display = 'none';
}
