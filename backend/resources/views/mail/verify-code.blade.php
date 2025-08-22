<x-mail::message>
# Verify Code

@if($scene === 'email_reset')
    1. This is a email reset code, please use it to reset your email.
    2. Your code is: {{ $code }}
@else
    1. This is a email verify code, please use it to verify your email.
    2. Your code is: {{ $code }}
@endif
    
Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
