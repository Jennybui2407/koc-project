import { google } from 'googleapis';
import { getGoogleAuthClient } from '../dist/services/google/auth.js';

export async function createArtistDraft({
  artistName,
  pronoun = 'anh',
  senderName = 'Thuận',
  toEmail = '',
  isManager = false,
}) {
  const auth = await getGoogleAuthClient();
  const gmail = google.gmail({ version: 'v1', auth });

  const artistUpper = artistName.toUpperCase();
  const subject = `KÍNH HẢI TRIỀU x ${artistUpper} | LỜI MỜI HỢP TÁC TRẢI NGHIỆM TẠI CỬA HÀNG`;
  const salutation = isManager
    ? `Dear team và <b>${artistName}</b>,`
    : `Dear <b>${artistName}</b>,`;

  const htmlBody = `<div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.6; color: #222222;">
  <p>${salutation}</p>

  <p>Em là <b>${senderName}</b>, hiện đang phụ trách Dự án truyền thông: <b>Trải Nghiệm Showroom – Chuẩn Đo Mắt 12 Bước</b> của thương hiệu <b>Kính Hải Triều</b> — thương hiệu được thành lập vào năm 2022 và là lĩnh vực phát triển thứ hai của chuỗi bán lẻ <b>Đồng Hồ Hải Triều</b>, một trong những hệ thống bán lẻ đồng hồ uy tín tại Việt Nam.</p>

  <p>👉 <b>Xem chi tiết Proposal của dự án:</b> <a href="https://proposal-kinh-hai-trieu.my.canva.site/2026-06-25-proposal-k-nh-h-i-tri-u" target="_blank" style="color: #0066cc; text-decoration: underline;">https://proposal-kinh-hai-trieu.my.canva.site/2026-06-25-proposal-k-nh-h-i-tri-u</a></p>

  <p>Thông qua các hoạt động nghệ thuật và hình ảnh cá nhân của ${artistName}, nhãn hàng nhận thấy ${pronoun} rất phù hợp với định hướng của dự án. Đặc biệt ở <b>sự chuyên nghiệp, hình ảnh chỉn chu trước công chúng</b> và <b>phong cách sống đề cao chất lượng sức khỏe trong cuộc sống hiện đại</b>.<br/>
  Nên rất yêu thích ${pronoun} và mong muốn có cơ hội đồng hành cùng ${pronoun} trong dự án lần này để:</p>

  <ul style="padding-left: 20px; margin-top: 8px; margin-bottom: 8px;">
    <li style="margin-bottom: 8px;"><b>Trải nghiệm đến showroom tư vấn và đo mắt chuẩn 12 bước tại Kính Hải Triều</b>. Về sản xuất nội dung, brand chịu 100% sản xuất (kịch bản, quay, chụp, ekip), ${pronoun} chỉ cần tham gia diễn xuất theo kịch bản nhẹ nhàng, nội dung thiên về trải nghiệm thật.</li>
    <li style="margin-bottom: 8px;"><b>Lan tỏa thông điệp về tầm quan trọng của việc đo mắt đúng chuẩn</b> tại những hệ thống uy tín, nơi giúp xác định chính xác tình trạng thị lực.</li>
    <li style="margin-bottom: 8px;"><b>Đưa ra giải pháp kính phù hợp</b>, từ đó bảo vệ đôi mắt một cách khoa học và lâu dài.</li>
  </ul>

  <p><b>${senderName} rất sẵn lòng trao đổi chi tiết hơn về dự án hợp tác.</b></p>

  <p>Rất mong nhận được phản hồi từ ${artistName} và hy vọng có cơ hội đồng hành cùng ${pronoun}.</p>

  <p>Thân mến,<br/>
  <b>${senderName}</b>.</p>

  <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />

  <p style="color: #555555; font-size: 13px;"><b>Tham khảo thêm thông tin chi tiết về Kính Hải Triều tại:</b><br/>
  <br/>
  <b>Thông tin về Kính Hải Triều:</b><br/>
  - Giới thiệu Kính Hải Triều: <a href="https://kinhhaitrieu.com/gioi-thieu-kinh-hai-trieu" target="_blank" style="color: #0066cc;">https://kinhhaitrieu.com/gioi-thieu-kinh-hai-trieu</a><br/>
  - Quy trình đo mắt chuẩn Quốc tế: <a href="https://kinhhaitrieu.com/dich-vu-do-mat" target="_blank" style="color: #0066cc;">https://kinhhaitrieu.com/dich-vu-do-mat</a><br/>
  <br/>
  <b>Các kênh truyền thông chính thống của Kính Hải Triều:</b><br/>
  - Fanpage Kính Hải Triều: <a href="https://www.facebook.com/kinhhaitrieu.entertainment" target="_blank" style="color: #0066cc;">https://www.facebook.com/kinhhaitrieu.entertainment</a><br/>
  - Youtube Kính Hải Triều: <a href="https://www.youtube.com/@kinhhaitrieu" target="_blank" style="color: #0066cc;">https://www.youtube.com/@kinhhaitrieu</a></p>
</div>`;

  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
  const messageParts = [
    'From: "Thuận Bùi" <trainee.ngocthuan@donghohaitrieu.vn>',
    `To: ${toEmail || ''}`,
    `Subject: ${utf8Subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=utf-8',
    '',
    htmlBody,
  ];

  const raw = Buffer.from(messageParts.join('\r\n'))
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await gmail.users.drafts.create({
    userId: 'me',
    requestBody: {
      message: { raw },
    },
  });

  return {
    draftId: res.data.id,
    subject,
    htmlBody,
  };
}
