import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  telegramId?: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng điền đầy đủ thông tin bắt buộc.' },
        { status: 400 }
      );
    }

    // Validate Telegram ID format if provided
    if (body.telegramId && body.telegramId.trim()) {
      if (!body.telegramId.startsWith('@')) {
        return NextResponse.json(
          { success: false, error: 'Telegram ID phải bắt đầu bằng @' },
          { status: 400 }
        );
      }
      
      if (!/^@[a-zA-Z0-9_]+$/.test(body.telegramId)) {
        return NextResponse.json(
          { success: false, error: 'Telegram ID không hợp lệ' },
          { status: 400 }
        );
      }
    }

    // Get environment variables
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Missing Telegram configuration');
      return NextResponse.json(
        { success: false, error: 'Cấu hình server chưa đúng.' },
        { status: 500 }
      );
    }

    // Format message for Telegram
    const telegramMessage = `
🔔 <b>Liên hệ mới từ Website</b>

👤 <b>Họ tên:</b> ${body.name}
📧 <b>Email:</b> ${body.email}
${body.telegramId ? `💬 <b>Telegram:</b> ${body.telegramId}` : ''}
📋 <b>Chủ đề:</b> ${body.subject || 'Không có chủ đề'}

💬 <b>Tin nhắn:</b>
${body.message}

⏰ <b>Thời gian:</b> ${new Date().toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })}

${body.telegramId ? '🚀 <i>Có Telegram ID - Ưu tiên phản hồi!</i>' : '📬 <i>Chỉ có Email - Phản hồi qua email</i>'}

---
💻 <i>Từ Thomas Portfolio Website</i>
    `.trim();

    // Send to Telegram
    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const telegramResponse = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    const telegramData = await telegramResponse.json();

    if (!telegramResponse.ok) {
      console.error('Telegram API Error:', telegramData);
      return NextResponse.json(
        { success: false, error: 'Không thể gửi tin nhắn. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    console.log('Message sent to Telegram successfully:', telegramData);

    // Return success with personalized message
    const responseMessage = body.telegramId 
      ? `Tin nhắn đã được gửi thành công! Thomas sẽ liên hệ lại qua ${body.telegramId} sớm nhất có thể.`
      : 'Tin nhắn đã được gửi thành công! Thomas sẽ phản hồi qua email sớm nhất có thể.';

    return NextResponse.json({
      success: true,
      message: responseMessage,
      data: {
        messageId: telegramData.result?.message_id,
        timestamp: new Date().toISOString(),
        hasTeleg: !!body.telegramId
      }
    });

  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
