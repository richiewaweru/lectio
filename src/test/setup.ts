import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/svelte';
import { afterEach, vi } from 'vitest';

afterEach(() => {
	cleanup();
});

class ResizeObserverMock {
	observe() {}
	unobserve() {}
	disconnect() {}
}

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: (query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn()
	})
});

Object.defineProperty(globalThis, 'ResizeObserver', {
	writable: true,
	value: ResizeObserverMock
});

if (!window.HTMLElement.prototype.scrollIntoView) {
	window.HTMLElement.prototype.scrollIntoView = vi.fn();
}
