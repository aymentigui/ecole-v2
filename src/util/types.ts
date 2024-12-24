
export interface Formation {
  id: string;
  name: string;
  photo?: string;
  startDate: Date;
  endDate: Date;
  price: number;
  address: string;
  phone1: string;
  phone2?: string;
  numberOfDays?: number;
  numberOfHours?: number;
  numberOfSessions?: number;
  sessionDuration?: number;
  remarks?: string;
  isRegistrationAllowed?: boolean;
}
  
  export interface Collaboration {
    id: string;
    name: string;
    photo?: string;
    startDate: Date;
    endDate: Date;
    company: string;
    price: number;
    address: string;
    phone1: string;
    phone2?: string;
    numberOfDays?: number;
    numberOfHours?: number;
    numberOfSessions?: number;
    sessionDuration?: number;
    remarks?: string;
    isRegistrationAllowed?: boolean;
  }

  export interface Message {
    id: string;
    name: string;
    email: string;
    message: string;
    date?: Date;
    open: boolean;
  }

  
  export type Inscription = {
    id: string;
    nom: String;
    prenom: String;
    dateNaissance:Date;
    telephone: String;
    email: String;
    adresse?: String; // Optional
    createdAt:Date;
    updatedAt:Date;
    status: "en attente" | "confirme" | "annule"; // Possible values: en attente, confirme, annule
    Formation:Collaboration;
  };
  