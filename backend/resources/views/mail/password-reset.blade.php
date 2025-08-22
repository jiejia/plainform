<x-mail::message title="密码重置">
# 密码重置

您收到此邮件是因为我们收到了您账户的密码重置请求。

<x-mail::button :url="$resetUrl">
重置密码
</x-mail::button>

此密码重置链接将在60分钟后过期。

如果您没有请求重置密码，请忽略此邮件。

谢谢,<br>
{{ config('app.name') }}
</x-mail::message>
