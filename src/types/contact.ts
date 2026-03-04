export interface CountryPhoneOption {
  code: string
  name: string
  dialCode: string
  placeholder: string
}

export interface ContactFormData {
  name: string
  email: string
  countryCode: string
  phone: string
  message: string
}
