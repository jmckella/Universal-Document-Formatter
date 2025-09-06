import { useRef, useCallback, useEffect } from 'react';

interface FocusableElement {
  element: HTMLElement;
  previousFocus?: HTMLElement | null;
}

export const useFocusManagement = () => {
  const focusHistoryRef = useRef<HTMLElement[]>([]);
  const skipLinksRef = useRef<HTMLElement[]>([]);
  
  // Store the currently focused element before an action
  const storeFocus = useCallback(() => {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement && activeElement !== document.body) {
      focusHistoryRef.current.push(activeElement);
    }
  }, []);

  // Restore focus to the previously focused element
  const restoreFocus = useCallback(() => {
    const previousElement = focusHistoryRef.current.pop();
    if (previousElement && document.contains(previousElement)) {
      // Small delay to ensure DOM updates are complete
      setTimeout(() => {
        previousElement.focus();
      }, 10);
    }
  }, []);

  // Move focus to a specific element
  const moveFocusTo = useCallback((element: HTMLElement | string) => {
    const targetElement = typeof element === 'string' 
      ? document.getElementById(element) || document.querySelector(element)
      : element;
    
    if (targetElement) {
      // Make element focusable if it isn't already
      if (!targetElement.hasAttribute('tabindex')) {
        targetElement.setAttribute('tabindex', '-1');
      }
      
      setTimeout(() => {
        targetElement.focus();
      }, 10);
    }
  }, []);

  // Get all focusable elements within a container
  const getFocusableElements = useCallback((container: HTMLElement): HTMLElement[] => {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'textarea:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ');

    return Array.from(container.querySelectorAll(focusableSelectors))
      .filter((element) => {
        const el = element as HTMLElement;
        return el.offsetParent !== null && // Element is visible
               !el.hasAttribute('disabled') &&
               el.getAttribute('tabindex') !== '-1';
      }) as HTMLElement[];
  }, []);

  // Register a skip link
  const registerSkipLink = useCallback((element: HTMLElement) => {
    if (!skipLinksRef.current.includes(element)) {
      skipLinksRef.current.push(element);
    }
  }, []);

  // Handle skip link activation
  const activateSkipLink = useCallback((targetId: string) => {
    const target = document.getElementById(targetId);
    if (target) {
      moveFocusTo(target);
      
      // Scroll target into view
      target.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }, [moveFocusTo]);

  return {
    storeFocus,
    restoreFocus,
    moveFocusTo,
    getFocusableElements,
    registerSkipLink,
    activateSkipLink,
  };
};