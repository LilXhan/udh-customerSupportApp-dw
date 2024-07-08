export interface User {
  id:               number;
  email:            string;
  username:         string;
  first_name:       string;
  last_name:        string;
  is_staff:         boolean;
  is_superuser:     boolean;
  is_authenticated: boolean;
}
