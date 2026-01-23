import type {
  CustomerRequestDTO,
  CustomerResponseDTO,
  AppErrorResponse,
} from "@/common/customers/customerTypes";

const App_Url = `http://localhost:8087/api/customers`;

export const createCustomer = async (
  data: CustomerRequestDTO
): Promise<CustomerResponseDTO> => {
  const response = await fetch(App_Url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = (await response
      .json()
      .catch(() => null)) as AppErrorResponse | null;

    if (errorData && errorData.message) {
      console.error(
        `Backend error (Code ${errorData.error}): ${errorData.message}`
      );
      throw new Error(errorData.message);
    }

    if (response.status === 400) {
      throw new Error(
        "Validation error. Please check that the DNI has 8 digits and the email address is correct."
      );
    }

    throw new Error("An unexpected server error occurred.");
  }
  return response.json();
};

interface EmailRequest {
  email: string;
}

export const updateCustomerEmail = async (
  dni: string,
  newEmail: string
) : Promise<CustomerResponseDTO> => {
  const url= `${App_Url}/dni/${dni}/email`;
  const body: EmailRequest = {email: newEmail};

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type":"application/json",
    },
    body: JSON.stringify(body),
  });

  if(!response.ok){
    const errorData = (await response
      .json()
      .catch(()=> null)) as AppErrorResponse | null;

      if (errorData && errorData.message){
        throw new Error(errorData.message);
      }

      if(response.status ===404){
        throw new Error("Customer not found with the provided DNI.");
      }

      throw new Error("Could not update email. Please check the data.");
  }

  return response.json();
};
