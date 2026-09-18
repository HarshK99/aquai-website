<?php
// Aquai contact form handler. Plain PHP mail(), no dependencies - runs on
// Hostinger's shared-hosting PHP stack. Deployed verbatim alongside the
// static export (public/ is copied as-is into out/ at build time).

declare(strict_types=1);

// Keep in sync by hand with CONTACT.email in lib/siteConfig.ts - this file
// sits outside the Next/TS build and can't import it.
const RECIPIENT = 'info@aquaiworld.com';

header('Content-Type: application/json');

function respond(bool $success, int $status, string $error = ''): void {
    http_response_code($status);
    $payload = ['success' => $success];
    if ($error !== '') {
        $payload['error'] = $error;
    }
    echo json_encode($payload);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 405, 'Method not allowed');
}

// Honeypot - bots fill hidden fields; pretend success without sending mail.
if (!empty($_POST['botcheck'])) {
    respond(true, 200);
}

function field(string $key): string {
    return trim((string)($_POST[$key] ?? ''));
}

// Strip CR/LF from anything that can end up in a mail header, to block
// header injection via the classic PHP-mail-form vulnerability.
function headerSafe(string $value): string {
    return trim(preg_replace('/[\r\n]+/', ' ', $value));
}

$name = field('name');
$email = field('email');
$phone = field('phone');
$organization = field('organization');
$enquiryType = field('enquiry_type') ?: 'General enquiry';
$message = field('message');

if ($name === '' || $email === '' || $message === '') {
    respond(false, 422, 'Missing required fields');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 422, 'Invalid email address');
}

$name = headerSafe($name);
$email = headerSafe($email);

$subject = 'Aquai enquiry: ' . headerSafe($enquiryType);

$body = "New enquiry from the Aquai website contact form.\n\n"
    . "Name: {$name}\n"
    . "Email: {$email}\n"
    . 'Phone: ' . ($phone !== '' ? $phone : 'Not provided') . "\n"
    . 'Company: ' . ($organization !== '' ? $organization : 'Not provided') . "\n"
    . "\n{$message}\n";

$headers = "From: Aquai Website <no-reply@aquaiworld.com>\r\n"
    . "Reply-To: {$name} <{$email}>\r\n"
    . "MIME-Version: 1.0\r\n"
    . "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = mail(RECIPIENT, $subject, $body, $headers);

if (!$sent) {
    respond(false, 502, 'Mail transport failed');
}

respond(true, 200);
