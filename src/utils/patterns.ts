export const onlyLetters =
  /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]*$/

export const onlyNumbers = /^[0-9]+$/

export const onlyLettersAndNumbers =
  /^[a-zA-ZÀ-ÿ\u00f1\u00d10-9]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d10-9]*)*[a-zA-ZÀ-ÿ\u00f1\u00d10-9]+$/

export const onlyDecimalNumbers = /^\d+\.?\d*$/

export const zipCode = /^\d{5}$/

export const phoneNumber = /^\d{10}$/

export const username = /^[a-zA-ZÀ-ÿ\u00f1\u00d10-9_$#%=@-]+$/

export const simpleText = /^[\p{L}\p{N}\p{P}\p{Sc}\s]+$/u

export const urlPattern = /^(https?):\/\/[^\s/$.?#].[^\s]*$/

export const CURPPattern =
  /^([A-ZÑ]{4})(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01]))([H,M][A-Z]{2})([B,C,D,F,G,H,J,K,L,M,N,Ñ,P,Q,R,S,T,V,W,X,Y,Z]{3})([A-Z0-9]\d)$/gm

export const RFCPattern =
  /^([A-ZÑ&]{3,4})(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01]))([A-Z\d]{2})([A\d])$/gm
