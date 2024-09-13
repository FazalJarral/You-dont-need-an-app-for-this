class ExitPopup extends HTMLElement {
    constructor() {
      super();
      this._popupShown = false;
      this._timeoutId = null;
    }
  
    connectedCallback() {
      this._popup = this.querySelector("#popup");
      this._closeButton = this.querySelector("#close-button");
  
      if (this._popup && !this._shouldHidePopup()) {
        this._setupEventListeners();
      }
    }
  
    _setupEventListeners() {
      const onMouseLeave = (event) => {
  
        if (!this._popupShown && event.clientY <= 0) {
          this._popupShown = true;
          this._timeoutId = setTimeout(() => {
            this._popup.style.display = "block";
          }, 300);
          document.removeEventListener("mouseleave", onMouseLeave); 
        }
      };
  
      document.addEventListener("mouseleave", onMouseLeave);
  
      this._closeButton.addEventListener("click", () => {
        this._closePopup();
      });
    }
  
    _closePopup() {
      clearTimeout(this._timeoutId); 
      this._popup.style.display = "none"; 
      this._setPopupDismissed(); 
    }
  
    _shouldHidePopup() {
      const popupDismissed = localStorage.getItem("exitIntentPopupDismissed");
      if (popupDismissed) {
        const dismissedTime = new Date(popupDismissed);
        const currentTime = new Date();
        const diffInHours = (currentTime - dismissedTime) / (1000 * 60 * 60); 
  
        return diffInHours < 24; 
      }
      return false;
    }
  
    _setPopupDismissed() {
      const currentTime = new Date();
      localStorage.setItem("exitIntentPopupDismissed", currentTime.toISOString());
    }
  }
  
  if (!customElements.get('exit-popup')) {
    customElements.define("exit-popup", ExitPopup);
  }
  