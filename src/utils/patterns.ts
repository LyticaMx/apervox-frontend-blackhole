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
