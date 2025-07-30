// script.js - Shared JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle    
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-bars');
          icon.classList.toggle('fa-times');
        }
      });
    }

    document.querySelectorAll('.dropdown > a').forEach(link => {
        link.addEventListener('click', function (e) {
          // Only apply on mobile
          if (window.innerWidth <= 768) {
            e.preventDefault(); // prevent navigation
      
            const parentLi = this.parentElement;
            parentLi.classList.toggle('open');
          }
        });
      });



    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const icon = mobileToggle.querySelector('i');
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                }
            }
        });
    });
    
    // Sticky header on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            header.classList.toggle('sticky', window.scrollY > 50);
        }
    });
    
    // Form Submission Handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.innerHTML = `
                <div style="padding: 15px; background: #d4edda; color: #155724; border-radius: 8px; margin-top: 15px; display: flex; align-items: center;">
                    <i class="fas fa-check-circle" style="margin-right: 10px;"></i>
                    Thank you! Your submission has been received.
                </div>
            `;
            
            // Insert after form
            form.parentNode.insertBefore(successMsg, form.nextSibling);
            
            // Reset form
            form.reset();
            
            // Remove message after 5 seconds
            setTimeout(() => {
                successMsg.remove();
            }, 5000);
        });
    });
});
