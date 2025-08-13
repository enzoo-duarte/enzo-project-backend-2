function resetPasswordTemplate(link) {
    return `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
            <h2 style="color: #333;">Password Reset</h2>
            <p>Click here to reset your password:</p>
            <a href="${link}" 
                style="display: inline-block; background-color: #007bff; color: white; padding: 12px 24px; 
                    border-radius: 5px; text-decoration: none; font-weight: bold; margin-top: 20px;">
                Reset Password
            </a>
            <p style="margin-top: 20px; font-size: 12px; color: #888;">
                If you have not requested this, please ignore this email.
            </p>
        </div>
    `;
}

module.exports = resetPasswordTemplate;
