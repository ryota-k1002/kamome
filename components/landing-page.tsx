'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Link as LinkIcon, ChevronRight, ExternalLink, Facebook } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const WaveAndBirdAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const waveColors = ['#b5d3dc', '#97bfcc', '#79a7b6'];
    const waveCount = 3;

    const waves = Array(waveCount).fill(null).map((_, i) => ({
      amplitude: 30 + i * 15,
      frequency: 0.005 - i * 0.001,
      phase: 0,
      y: canvas.height * (0.5 + i * 0.15)
    }));

    const birdParticles = Array(3).fill(null).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.5,
      size: 20,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    }));

    const drawWave = (wave: typeof waves[0], color: string) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let x = 0; x <= canvas.width; x++) {
        const y = wave.y + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.fillStyle = color;
      ctx.fill();
    };

    const drawBird = (x: number, y: number, size: number) => {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x + size / 2, y - size / 2, x + size, y);
      ctx.quadraticCurveTo(x + size * 1.5, y - size / 2, x + size * 2, y);
      ctx.strokeStyle = '#545454';
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      waves.forEach((wave, index) => {
        wave.phase += 0.02;
        drawWave(wave, waveColors[index]);
      });

      birdParticles.forEach(bird => {
        bird.x += bird.vx;
        bird.y += bird.vy;

        if (bird.x < 0 || bird.x > canvas.width) bird.vx *= -1;
        if (bird.y < 0 || bird.y > canvas.height * 0.5) bird.vy *= -1;

        drawBird(bird.x, bird.y, bird.size);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" aria-hidden="true" />;
};

const HeroSection = ({ timeLeft }: { timeLeft: string }) => {
  const handleScrollToRegistration = () => {
    const registrationSection = document.getElementById('registration');
    if (registrationSection) {
      registrationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-screen overflow-hidden bg-white">
      <WaveAndBirdAnimation />
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <h1 className="text-5xl font-bold mb-4 text-[#545454]">かもめ会議 2024</h1>
        <p className="text-xl mb-4 text-[#545454]">新たな視点で、ビジネスの未来を描く</p>
        <div className="bg-[#ffde59] text-[#545454] p-4 rounded-lg mb-4">
          <p className="font-bold">開催まであと</p>
          <p className="text-2xl">{timeLeft}</p>
        </div>
        <button 
          onClick={handleScrollToRegistration}
          className="bg-[#ffde59] text-[#545454] px-8 py-3 rounded-full font-semibold hover:bg-[#ff8383] hover:text-white transition-colors duration-300"
        >
          参加申し込み
        </button>
      </div>
    </div>
  );
};

const FloatingHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="w-48 h-20">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kamome_logo_padding-VBJ3I4qnKZ8Fa7oZLYgwD1xvXWtFf8.png"
              alt="かもめ会議 2024 ロゴ"
              width={192}
              height={80}
              priority
            />
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#about" className="hover:text-[#ffde59]">ABOUT</a></li>
              <li><a href="#timetable" className="hover:text-[#ffde59]">TIME TABLE</a></li>
              <li><a href="#registration" className="hover:text-[#ffde59]">参加申し込み</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

const schedule = [
  { startTime: '9:30', endTime: '10:00', event: '受付開始', type: 'simple' },
  { startTime: '10:00', endTime: '10:15', event: 'オープニング', type: 'simple' },
  {
    startTime: '10:15',
    endTime: '11:45',
    event: '全体会',
    type: 'plenary',
    duration: '(90min.)',
    sessions: [
      {
        event: '全体会',
        title: '地域のつながりと志\n~ 横浜にゆかりのある4名が語る自己実現 ~',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisi eu tincidunt tincidunt, nunc nunc tincidunt nunc, vitae aliquam nisl nunc vitae nisl. Sed euismod, nunc sit amet aliquam tincidunt, nunc nunc tincidunt nunc, vitae aliquam nisl nunc vitae nisl. Sed euismod, nunc sit amet aliquam tincidunt, nunc nunc tincidunt nunc, vitae',
        speakers: [
          { name: '高野 俊行氏', organization: '元日揮ホールディングス\nユニクル株式会社', position: 'CEO', info: '' },
          { name: '大野 淳史氏', organization: 'TOPPANホールディングス', position: '事業開発本部ビジネスイノベーションセンター戦略投資部', info: '' },
          { name: '古野 直毅氏', organization: 'フィクスコンシェル株式会社', position: '代表取締役', info: '' },
          { name: '得能 淳氏', organization: 'グロービス経営大学院大学', position: '特設キャンパス責任者(横浜・仙台・水戸)', info: '' }
        ]
      }
    ]
  },
  { startTime: '11:45', endTime: '13:00', event: 'ランチブレイク /\nネットワーキング', type: 'simple' },
  {
    startTime: '13:00',
    endTime: '14:00',
    event: '分科会1',
    type: 'breakout',
    duration: '(60min.)',
    sessions: [
      {
        event: '分科会A',
        title: '新規事業への挑戦\n〜対話を通して見えない枠を外してみよう〜',
        description: '思いついたアイディアを他の人に話すの恥ずかしい‥や、そんなの前例ないし‥とか、うまくいかなかったらどうしよう‥、のように、新しいことへの挑戦は自分の中に勝手に作っている見えない壁が原因であることが多いです。上手くいかないながらも聴覚障害者向けの事業を進めてきた私の事例をもとに、それだったら自分もできるかも、言われてみたら自分だけが気にしているだけかも、など、少しでも見えない壁を取り除き、一歩踏み出すきっかけを一緒に見つけられるようなセッションをご提供します。',
        speakers: [
          { name: '岩田 佳子氏', organization: '株式会社リコー／グロービス本科2022期卒業生', position: '', info: '' }
        ]
      },
      {
        event: '分科会B',
        title: 'ヨコハマ未来創造会議\n～フードサーキュラーを起点に子どもの可能性を最大化するには？～',
        description: '2027年に横浜で開催される、GREEN×EXPO 2027（2027年国際園芸博覧会）を契機に、現在の大学生や企業の若手社員の若者が参加して、将来の社会についての議論、共感、自分ごとの醸成を目指す「ヨコハマ未来創造会議」が本年横浜市で立ち上がりました。\n全部で5つのプロジェクトが進行中で、その中の「フードサーキュラーを起点に子どもの可能性を最大化するには？」に取り組んでいるチームの発表を行っていただきます。キーワードは、#フードロスゼロ、＃貧困解決、＃学校給食。当日はプロジェクトの発表とともに、かもめ会議参加者と意見交換ができればと考えております。',
        speakers: [
          { name: '榎 裕子氏', organization: 'ヨコハマ未来創造会議 メンバー', position: '', info: '', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E3%83%A8%E3%82%B3%E3%83%8F%E3%83%9E%E6%9C%AA%E6%9D%A5%E4%BC%9A%E8%AD%B0_%E6%A6%8E%E3%81%95%E3%82%93-mQAcpSPen6tOaEiRAL8wIkWkiqZNVV.png' },
          { name: '馬場 英鷹氏', organization: 'ヨコハマ未来創造会議 メンバー', position: '', info: '', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E3%83%A8%E3%82%B3%E3%83%8F%E3%83%9E%E6%9C%AA%E6%9D%A5%E4%BC%9A%E8%AD%B0_%E9%A6%AC%E5%A0%B4%E3%81%95%E3%82%93-r56OjWtqO39IasrnkP0tTuxQuMUjQ0.png' }
        ]
      }
    ]
  },
  { startTime: '14:00', endTime: '14:15', event: '休憩', type: 'simple' },
  {
    startTime: '14:15',
    endTime: '15:15',
    event: '分科会2',
    type: 'breakout',
    duration: '(60min.)',
    sessions: [
      {
        event: '分科会C',
        title: '地方創生\n～鎌倉から地方創成を生み出す地域企業について～',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisi eu tincidunt tincidunt, nunc nunc tincidunt nunc, vitae aliquam nisl nunc vitae nisl. Sed euismod, nunc sit amet aliquam tincidunt, nunc nunc tincidunt nunc, vitae aliquam nisl nunc vitae nisl. Sed euismod, nunc sit amet aliquam tincidunt, nunc nunc tincidunt nunc, vitae',
        speakers: [
          { name: '宮本 早織氏', organization: '面白法人カヤック', position: '地域資本主義事業部', info: '' }
        ]
      },
      {
        event: '分科会D',
        title: '未病対策\n～神奈川県の未病対策の取り組み～',
        description: '神奈川県では、次世代社会システ厶「神奈川Me-BYOリビングラボ」の構築を進め、未病対策を推進しています。産官学連携で新たな価値や未病産業を創出し、持続可能な健康長寿社会の実現を目指しています。\nまた、神奈川県は全国に先駆けて神奈川発の未病産業の市場拡大を図るため、「ME-BYOサミット神奈川」を開催し、未病コンセプトやその改善の重要性を普及・啓発する活動を展開しており、未病における最新の取り組みについてもご紹介します。',
        speakers: [
          { name: '成田 悠亜氏', organization: '神奈川県政策局', position: 'いのち・未来戦略本部 未病連携グループ 主任主事', info: '' }
        ]
      }
    ]
  },
  { startTime: '15:15', endTime: '15:30', event: '休憩', type: 'simple' },
  {
    startTime: '15:30',
    endTime: '16:30',
    event: '分科会3',
    type: 'breakout',
    duration: '(60min.)',
    sessions: [
      {
        event: '分科会E',
        title: '宇宙ビジネスの最前線へ\n～地上のスキルが宇宙を拓く～',
        description: '昨今注目を集める「宇宙ビジネス」、具体的にどのようなことが行われていて、どんな可能性があるのか気になる方も多いのではないでしょうか？ここ横浜・神奈川でもJAXAをはじめとするさまざまなプレイヤーが活躍しています。\n実はキャリアにおいても、高度専門領域というイメージに反して、地上産業の知見やスキルが宇宙産業で大いに求められています。\n今回は、大企業から宇宙ベンチャーに飛び込んだデザイナーが、ユニークなキャリア体験談も交えながら、その魅力についてお話しします。',
        speakers: [
          { name: '山下 コウセイ氏', organization: 'DigitalBlast', position: '宇宙デザイナー', info: '' },
          { name: '田村 拓久良氏', organization: 'DigitalBlast', position: 'メディア事業部 副部長', info: '' }
        ]
      },
      {
        event: '分科会F',
        title: 'サーキュラーエコノミー\n～リーダー達の社会課題への取り組み方～',
        description: 'サーキュラーエコノミーで業界をリードする代表者が、食品廃棄物を利用したリサイクル事業や、容器リユースシェアリングサービス「Megloo」について話します。起業から運営までの実務経験を基に、起業のノウハウや業界の未来について伺います。社会課題に関心を持つ方にとって、次の一歩を踏み出すためのヒントに満ちた１時間です。',
        speakers: [
          { name: '善積 真吾氏', organization: '株式会社カマン', position: 'FOUNDER & CEO', info: '' }
        ]
      }
    ]
  },
  { startTime: '16:30', endTime: '16:45', event: '休憩', type: 'simple' },
  { startTime: '16:45', endTime: '17:15', event: 'クロージング /\nディスカッション', type: 'simple' }
];

const EventPopup = ({ session, eventType, startTime, endTime, duration }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition-colors duration-200 relative h-full">
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mb-2 ${eventType === 'plenary' ? 'bg-[#ffde59] text-[#545454]' : 'bg-[#ffde59] text-[#545454]'}`}>
            {session.event}
          </span>
          <h3 className="text-xl font-bold mb-2 break-words whitespace-pre-line">{session.title}</h3>
          <p className="text-sm text-gray-600">{session.speakers.map(speaker => speaker.name).join(' / ')}</p>
          <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-b-[40px] border-b-[#79a7b6] rounded-br-lg"></div>
          <ExternalLink className="absolute bottom-[5px] right-[5px] w-3.5 h-3.5 text-white z-10" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[680px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="mb-4 text-[#545454]">
            <span className="text-xl font-bold">{startTime}-{endTime}</span>
            {duration && <span className="text-sm ml-2">{duration}</span>}
            <br />
            <span className="inline-block px-3 py-1 bg-[#ffde59] text-[#545454] rounded-full text-sm font-semibold mt-2">{session.event}</span>
          </div>
        </DialogHeader>
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <DialogTitle className="text-xl font-bold mb-4 whitespace-pre-line">{session.title}</DialogTitle>
          <p className="mb-4 whitespace-pre-line">{session.description}</p>
          <div className="space-y-2">
            {session.speakers.map((speaker, speakerIndex) => (
              <div key={speakerIndex} className="flex items-center bg-[#79a7b6] text-white p-2 rounded-lg">
                <Image
                  src={speaker.image || "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kagome_symbol_circle-nXt3WkJj062REZ1jLWrRPFtFhsiiIG.png"}
                  alt={speaker.name}
                  width={40}
                  height={40}
                  className="rounded-full mr-2"
                />
                <div>
                  <p className="font-bold text-sm">{speaker.name}</p>
                  <p className="text-xs">{speaker.organization}</p>
                  <p className="text-xs">{speaker.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export function LandingPageComponent() {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const eventDate = new Date('2024-11-10T10:00:00')
      const difference = eventDate.getTime() - now.getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / 1000 / 60) % 60)
        const seconds = Math.floor((difference / 1000) % 60)

        setTimeLeft(`${days}日 ${hours}時間 ${minutes}分 ${seconds}秒`)
      } else {
        setTimeLeft('イベント開催中！')
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#79a7b6] text-[#545454] font-sans">
      <FloatingHeader />

      <main className="pt-24">
        <HeroSection timeLeft={timeLeft} />

        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">ABOUT</h2>
            <p className="text-lg mb-6">
              かもめ会議とは、グロービス経営大学院の公認クラブである、グロービス横浜活性化クラブ(GYAC)が主催のグロービスの単科生・本科生・卒業生のためのビジネスカンファレンス。
              参加者が、つながり・学び合い・一歩を踏み出すきっかけになるような場をご用意しています。
              様々なセッションが盛りだくさんのため、1日中楽しめること間違いなし。
            </p>
          </div>
        </section>

        <section id="timetable" className="py-20 bg-[#f4f4f4]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">TIME TABLE</h2>
            <div className="space-y-4 relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 transform -translate-x-1/2"></div>
              {schedule.map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md relative z-10">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span className="text-xl font-bold">{item.startTime}-{item.endTime}</span>
                      {item.duration && <p className="text-sm text-gray-600">{item.duration}</p>}
                    </div>
                    <span className={`text-lg ${['全体会', '分科会1', '分科会2', '分科会3'].includes(item.event) ? 'bg-[#ff8383] text-white px-2 py-1 rounded-full' : ''}`}>
                      {item.event.split('\n').map((line, i) => (
                        <span key={i} className="block">{line}</span>
                      ))}
                    </span>
                  </div>
                  {item.type === 'plenary' || item.type === 'breakout' ? (
                    <div className={`mt-4 ${item.type === 'plenary' ? 'grid-cols-1' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}`}>
                      {item.sessions.map((session, sessionIndex) => (
                        <div key={sessionIndex} className="mb-4 h-full">
                          <EventPopup 
                            session={session} 
                            eventType={item.type} 
                            startTime={item.startTime}
                            endTime={item.endTime}
                            duration={item.duration}
                          />
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="registration" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">参加申し込み</h2>
            <div className="bg-[#f4f4f4] p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-bold mb-4">申し込み方法</h3>
              <p className="mb-4">「かもめ会議 2024」への参加をお待ちしております。以下の手順に従ってお申し込みください。</p>
              
              <h4 className="text-lg font-bold mb-2">チケット購入</h4>
              <p className="mb-4">料金: 2,000円（税込）</p>
              <p className="mb-4">購入方法: Peatixにてチケットをお買い求めください。</p>

              <h4 className="text-lg font-bold mb-2">参加セッション申し込み</h4>
              <p className="mb-4">Google Formにて、ご希望の参加セッションをお選びください。</p>

              <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
                <p className="font-bold">重要なお知らせ:</p>
                <p>チケット購入とセッション申し込みの両方が必要です。Peatixでのチケット購入情報とGoogle Formでの申し込み内容に不整合がある場合、ご参加いただけない可能性がございますので、ご注意ください。</p>
              </div>

              <h4 className="text-lg font-bold mb-2">申し込み締め切り</h4>
              <p className="mb-4">参加希望人数が一定数に達した際に申し込みを締め切らせていただきます。</p>

              <h4 className="text-lg font-bold mb-2">お問い合わせ</h4>
              <p className="mb-1">かもめ会議運営事務局</p>
              <p className="mb-4">
                <a href="mailto:kamome_2024.stu@globis.ac.jp" className="text-blue-600 hover:underline">
                  kamome_2024.stu@globis.ac.jp
                </a>
              </p>

              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
                <Button className="bg-[#ffde59] text-[#545454] hover:bg-[#ffde59]/90">
                  <a href="https://kamome2024.peatix.com/" className="block w-full" target="_blank" rel="noopener noreferrer">チケットを購入する(Peatix)</a>
                </Button>
                <Button className="bg-[#79a7b6] text-white hover:bg-[#79a7b6]/90">
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSe0Ys4l33OIZ9_gRVaoUIDIAImHO-wwDkW5EmmZp91yJrYJWQ/viewform?usp=sf_link" className="block w-full" target="_blank" rel="noopener noreferrer">セッションに申し込む(Google Form)</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#545454] text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">開催情報</h2>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex items-center">
                <Calendar className="mr-2" />
                <span>2024年11月10日</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2" />
                <span>10:00 - 17:15</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2"  />
                <span>グロービス経営大学院 横浜校<br />横浜市西区みなとみらい2-2-1<br />横浜ランドマークタワー7F</span>
              </div>
              <div className="flex items-center">
                <LinkIcon className="mr-2" />
                <a href="https://mba.globis.ac.jp/campus/yokohama/" target="_blank" rel="noopener noreferrer" className="text-sm underline">
                  https://mba.globis.ac.jp/campus/yokohama/
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#79a7b6] text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">
            お問い合わせ: <a href="mailto:kamome_2024.stu@globis.ac.jp" className="hover:underline">kamome_2024.stu@globis.ac.jp</a>
          </p>
          <div className="flex justify-center items-center mb-4">
            <a href="https://www.facebook.com/groups/gyac.yokohama/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#ffde59] transition-colors duration-300">
              <Facebook size={24} />
              <span className="sr-only">Facebook Group</span>
            </a>
          </div>
          <p>&copy; 2024 かもめ会議. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}