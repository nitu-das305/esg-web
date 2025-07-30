import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);
  
  // Only access localStorage in browser environment
  if (!isPlatformBrowser(platformId)) {
    // During SSR/prerendering, redirect to login
    router.navigate(['/login']);
    return false;
  }
  
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    try {
      // Validate that the stored user data is valid JSON
      const user = JSON.parse(currentUser);
      if (user && user.username && user.role) {
        return true;
      } else {
        // Invalid user data, clear it and redirect to login
        localStorage.removeItem('currentUser');
        router.navigate(['/login']);
        return false;
      }
    } catch (error) {
      // Invalid JSON, clear it and redirect to login
      localStorage.removeItem('currentUser');
      router.navigate(['/login']);
      return false;
    }
  } else {
    // No user data, redirect to login
    router.navigate(['/login']);
    return false;
  }
}; 