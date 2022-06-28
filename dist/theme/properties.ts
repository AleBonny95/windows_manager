export const lightId = 'light';
export const darkId = 'dark';

export interface Properties {
  background: string;
  text: string;
  //aggiungere tutte le variabili per personalizzare i componenti
}

export const darkTheme: Properties = {
  background: 'var(--dark-background)',
  text: 'var(--dark-text)',
};

export const lightTheme: Properties = {
  background: 'var(--light-background)',
  text: 'var(--light-text)',
};