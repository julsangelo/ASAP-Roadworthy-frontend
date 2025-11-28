export type BookingAttachment = {
  uuid: string;
  edit_date: string;
  active: number;
  attachment_name: string;
  file_type: string;
  photo_width: string;
  photo_height: string;
  attachment_source: string;
  lng: number;
  lat: number;
  tags: string;
  extracted_info: string;
  is_favourite: string;
  metadata: boolean;
  created_by_staff_uuid: string;
  timestamp: string;
  related_object: string;
  related_object_uuid: string;
};

export type Booking = {
  uuid: string;
  active: number;
  date: string;
  job_address: string;
  billing_address: string;
  status: string;
  quote_date: string;
  work_order_date: string;
  work_done_description: string;
  generated_job_id: string;
  completion_date: string;
  completion_actioned_by_uuid: string;
  unsuccessful_date: string;
  payment_date: string;
  payment_method: string;
  payment_amount: number;
  payment_actioned_by_uuid: string;
  edit_date: string;
  payment_note: string;
  ready_to_invoice: string;
  ready_to_invoice_stamp: string;
  company_uuid: string;
  geo_is_valid: number;
  lng: number;
  lat: number;
  geo_country: string;
  geo_postcode: string;
  geo_state: string;
  geo_city: string;
  geo_street: string;
  geo_number: string;
  payment_processed: number;
  payment_processed_stamp: string;
  payment_received: number;
  payment_received_stamp: string;
  total_invoice_amount: string;
  job_is_scheduled_until_stamp: string;
  category_uuid: string;
  queue_uuid: string;
  queue_expiry_date: string;
  badges: string;
  quote_sent: boolean;
  invoice_sent: boolean;
  purchase_order_number: string;
  invoice_sent_stamp: string;
  queue_assigned_staff_uuid: string;
  quote_sent_stamp: string;
  job_description: string;
  created_by_staff_uuid: string;
  attachments: BookingAttachment[];
};

export type User = {
  id: number;
  name: string;
  email?: string;
  phone?: string;
};

export type BookingMessage = {
  id: number;
  bookingUuid: string;
  bookingDescription: string;
  bookingStatus: string;
  userId: number;
  message: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
};

type Message = {
  bookingUuid: string;
  bookingDescription: string;
};

export type MessageSummaries = Record<string, Message[]>;
