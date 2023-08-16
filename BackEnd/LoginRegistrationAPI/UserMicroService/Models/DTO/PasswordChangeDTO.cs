namespace UserMicroService.Models.DTO
{
    public class PasswordChangeDTO
    {
        public string email { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmNewPassword { get; set; }
    }
}
