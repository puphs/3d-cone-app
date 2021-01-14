export default class Toast {
	constructor(duration = 0, message = '') {
		// creating toast element
		this.toastElement = document.createElement('div');
		this.toastElement.classList.add('toast');
		this.toastElement.innerHTML = `
		<div class="toast__inner">
			<h3 class="toast__message"></h3>
		</div>
		`;
		this.toastMessageElement = this.toastElement.querySelector('.toast__message');

		this.animationShowName = 'toast-show';
		this.animationHideName = 'toast-hide';

		// adding styles
		this.addStyle();

		document.body.append(this.toastElement);

		this.setMessage(message);
		this.setDuration(duration);
		this.hideTimeout = 0;
	}

	addStyle() {
		let styleClass = 'toast__style';
		if (document.querySelector('.' + styleClass)) return;

		let styleElement = document.createElement('style');
		styleElement.classList.add(styleClass);
		styleElement.append(
			document.createTextNode(`
		.toast {
			position: fixed;
			top: 16px;
			width: 100%;
			opacity: 0;
			display: flex;
			justify-content: center;
			animation-fill-mode: forwards;
			z-index: -100;
		}
		
		.toast__inner {
			min-width: 200px;
			border: 2px solid red;
			padding: 4px 16px;
			border-radius: 8px;
		}
		
		.toast__message {
			font-family: 'Nunito Sans';
			font-size: 18px;
			font-weight: 400;
			line-height: 28px;
			margin: 0;
			text-align: center;
			color: red;
		}
        @keyframes ${this.animationShowName} {
            0% {
                transform: translateY(10px);
				opacity: 0;
				z-index: -100;
            }
            50% {
                transform: translateY(0px);
            }
            100% {
				opacity: 1;
				z-index: 100;
            }
        }
        
        @keyframes ${this.animationHideName} {
            0% {
				opacity: 1;
				display: none;
				z-index: 100;
            }
            50% {
            }
            100% {
				z-index: -100;
				opacity: 0;
            }
        }
        `)
		);
		document.head.append(styleElement);
	}

	setMessage(message) {
		this.toastMessageElement.textContent = message;
	}

	// if duration is 0, then toast won't be hidden
	setDuration(duration) {
		this.duration = duration;
	}

	show() {
		requestAnimationFrame(() => {
			this.toastElement.style.animationName = `${this.animationShowName}`;
			this.toastElement.style.animationDuration = '0.5s';
			clearTimeout(this.hideTimeout);
			if (this.duration)
				this.hideTimeout = setTimeout(() => {
					this.hide();
				}, this.duration);
		});
	}

	hide() {
		requestAnimationFrame(() => {
			this.toastElement.style.animationName = `${this.animationHideName}`;
			this.toastElement.style.animationDuration = '1.4s';
		});
	}

	static get DURATION_SHORT() {
		return 1500;
	}
	static get DURATION_LONG() {
		return 3000;
	}
}
