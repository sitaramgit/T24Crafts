export class CreateUserProfileDto {
    fullName: string;
    email: string;
    phoneNumber: string;
    role: string;  // Include available roles as enum options
    // Add more fields as needed
}
