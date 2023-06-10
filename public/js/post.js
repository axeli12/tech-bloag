document.addEventListener('DOMContentLoaded', () => {

    // Create a new post
    const newPost = async (event) => {
      event.preventDefault();
      const blog_title = document.querySelector("#post-title").value.trim();
      const blog_content = document.querySelector("#content").value.trim();
      if ((blog_title, blog_content)) {
        const response = await fetch(`api/dashboard`, {
          method: "POST",
          body: JSON.stringify({ blog_title, blog_content }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          document.location.replace("/dashboard");
        } else {
          alert("Failed to create project");
        }
      }
    };
  
    const btnCreate = document.querySelector('.btn-create-post');
    if (btnCreate) {
      btnCreate.addEventListener("click", newPost);
    }
  
    // Delete a post
    const deletePost = async (event) => {
      if (event.target.hasAttribute('data-delete-post')) {
        const id = event.target.getAttribute('data-delete-post');
        console.log(id);
        const response = await fetch(`api/dashboard/${id}`, {
          method: 'DELETE',
        });
        console.log(response);
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to delete post');
        }
      }
    };
  
    document.querySelectorAll('.btn-delete-post').forEach(button => {
      button.addEventListener('click', deletePost);
    });
  });
  
  // Update a post
  const editButtonHandler = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('data-edit-post');
    const blog_content = document.querySelector(`#post-content-edit-${id}`).value;
    if (event.target.hasAttribute('data-edit-post')) {
      const response = await fetch(`api/dashboard/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ blog_content }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to edit post');
  
      }
    }
  };
  document.querySelectorAll('.btn-edit-post').forEach(button => {
    button.addEventListener('click', editButtonHandler);
  });
  