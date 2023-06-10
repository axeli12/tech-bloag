document.addEventListener('DOMContentLoaded', () => {
    const loginFormHandler = async (event) => {
      event.preventDefault();
      const email = document.querySelector('#email').value.trim();
      const password = document.querySelector('#password').value.trim();
      if (email && password) {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          document.location.replace('/');
        } else {
          alert('Failed to log in.');
        }
      }
    };
  
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', loginFormHandler);
    }
  
    const signupFormHandler = async (event) => {
      event.preventDefault();
  
      const username = document.querySelector('#username-signup').value.trim();
      const email = document.querySelector('#email-signup').value.trim();
      const password = document.querySelector('#password-signup').value.trim();
  
      if (username && email && password) {
        const response = await fetch('api/users', {
          method: 'POST',
          body: JSON.stringify({ username, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to sign up.');
        }
      }
    };
  
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', signupFormHandler);
    }
  });