'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from 'lucide-react'

const schedule = [
  { startTime: '9:30', endTime: '10:00', event: '受付開始', type: 'simple' },
  { startTime: '10:00', endTime: '10:15', event: 'オープニング', type: 'simple' },
  {
    startTime: '10:15',
    endTime: '11:45',
    event: '基調講演',
    type: 'detailed',
    duration: '90min',
    title: '横浜の繋がりの中での起業について',
    description: '・地域の繋がりはどのように起業に活きてきたか？\n・起業してビジネスを広げるにあたり地域のコミュニティをどのように生かしていきたいか？',
    speakers: [
      { name: '高野さん', info: '19 期' },
      { name: '得能さん' },
      { name: '大野さん' },
      { name: 'もじゃさん' }
    ]
  },
  { startTime: '11:45', endTime: '13:00', event: 'ランチブレイク・ネットワーキング', type: 'simple' },
  {
    startTime: '13:00',
    endTime: '14:00',
    event: '分科会1',
    type: 'breakout',
    duration: '60min',
    sessions: [
      {
        event: '分科会A',
        title: '会社内起業（新規事業）を通じた気付きや学び(仮)',
        description: 'XXXX',
        speakers: [
          { name: '岩田さん', info: '22期' }
        ]
      },
      {
        event: '分科会B',
        title: '～ ヨコハマ未来創造会議 ～\nフードサーキュラーを起点に子どもの可能性を最大化するには？',
        description: '2027年に横浜で開催される、GREEN×EXPO 2027（2027年国際園芸博覧会）を契機に、現在の大学生や企業の若手社員の若者が参加して、将来の社会についての議論、共感、自分ごとの醸成を目指す「ヨコハマ未来創造会議」が本年横浜市で立ち上がりました。\n全部で5つのプロジェクトが進行中で、その中の「フードサーキュラーを起点に子どもの可能性を最大化するには？」に取り組んでいるチームの発表を行っていただきます。キーワードは、#フードロスゼロ、＃貧困解決、＃学校給食。当日はプロジェクトの発表とともに、かもめ会議参加者と意見交換ができればと考えております。',
        speakers: [
          { name: '榎裕子氏', info: 'XXXXX' },
          { name: '馬場英鷹氏', info: 'XXXXX' }
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
    duration: '60min',
    sessions: [
      {
        event: '分科会C',
        title: '鎌倉から地方創成を生み出す地域企業について',
        description: 'XXX',
        speakers: [
          { name: 'XXX氏', info: '面白法人カヤック 地方創生事業部' }
        ]
      },
      {
        event: '分科会D',
        title: '神奈川県の未病対策の取り組み',
        description: 'XXX',
        speakers: [
          { name: 'XXX氏', info: '神奈川県政策局いのち・未来戦略本部室' },
          { name: '成松宏人氏', info: '神奈川県みらい未病コホート研究代表' }
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
    duration: '60min',
    sessions: [
      {
        event: '分科会E',
        title: '宇宙ビジネスの最前線へ：地上のスキルが宇宙を拓く',
        description: '昨今注目を集める「宇宙ビジネス」、具体的にどのようなことが行われていて、どんな可能性があるのか気になる方も多いのではないでしょうか？ここ横浜・神奈川でもJAXAをはじめとするさまざまなプレイヤーが活躍しています。\n実はキャリアにおいても、高度専門領域というイメージに反して、地上産業の知見やスキルが宇宙産業で大いに求められています。\n今回は、大企業から宇宙ベンチャーに飛び込んだデザイナーが、ユニークなキャリア体験談も交えながら、その魅力についてお話しします。',
        speakers: [
          { name: '山下紘生 氏', info: 'DigitalBlast　宇宙デザイナー' },
          { name: '田村拓久良 氏', info: 'XXX' }
        ]
      },
      {
        event: '分科会F',
        title: 'サーキュラーエコノミーのトップランナー達に聞く、社会課題への取り組み方',
        description: 'XXXX',
        speakers: [
          { name: '善積氏', info: 'Megloo' },
          { name: '高橋氏', info: '株式会社日本フードエコロジーセンター' }
        ]
      }
    ]
  },
  { startTime: '16:30', endTime: '16:40', event: '休憩', type: 'simple' },
  { startTime: '16:40', endTime: '17:15', event: 'クロージングディスカッション', type: 'simple' }
]

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
      <header className="bg-white shadow-md">
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
      </header>

      <main>
        <section className="bg-[#545454] text-white py-20">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">かもめ会議 2024</h1>
              <p className="text-xl mb-6">横浜の未来を創造する</p>
              <div className="bg-[#ffde59] text-[#545454] p-4 rounded-lg inline-block">
                <p className="font-bold">開催まであと</p>
                <p className="text-2xl">{timeLeft}</p>
              </div>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/placeholder.svg?height=300&width=400"
                alt="ビジネス会議イメージ"
                width={400}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">ABOUT</h2>
            <p className="text-lg mb-6">
              かもめ会議とは、グロービス経営大学院の公認クラブである、グロービス横浜活性化クラブ(GYAC)が主催のグロービスの単科生・本科生・卒業生のためのビジネスカンファレンス。
              参加者が、つながり・学び合い・一歩を踏み出すきっかけになるような場をご用意しています。
              様々なセッションが盛りだくさんのため、1日中楽しめること間違いなし。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-[#79a7b6] text-white p-4 rounded-lg">
                <h3 className="font-bold mb-2">横浜</h3>
                <p>都市の未来像</p>
              </div>
              <div className="bg-[#79a7b6] text-white p-4 rounded-lg">
                <h3 className="font-bold mb-2">地域創生</h3>
                <p>持続可能なコミュニティ</p>
              </div>
              <div className="bg-[#79a7b6] text-white p-4 rounded-lg">
                <h3 className="font-bold mb-2">サーキュラーエコノミー</h3>
                <p>循環型経済の実現</p>
              </div>
              <div className="bg-[#79a7b6] text-white p-4 rounded-lg">
                <h3 className="font-bold mb-2">社会課題</h3>
                <p>イノベーティブな解決策</p>
              </div>
            </div>
          </div>
        </section>

        <section id="timetable" className="py-20 bg-[#f4f4f4]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">TIME TABLE</h2>
            <div className="space-y-4">
              {schedule.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  {item.type === 'simple' ? (
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">{item.startTime}-{item.endTime}</span>
                      <span className="text-lg">{item.event}</span>
                    </div>
                  ) : item.type === 'detailed' || item.type === 'breakout' ? (
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="inline-block bg-[#ff8383] text-white px-3 py-1 rounded-full text-sm mb-2">
                            {item.event}
                          </span>
                          <h3 className="text-2xl font-bold">{item.title}</h3>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold">{item.startTime}-{item.endTime}</p>
                          <p className="text-gray-500">({item.duration})</p>
                        </div>
                      </div>
                      {item.type === 'detailed' ? (
                        <>
                          <p className="mb-4 whitespace-pre-line">{item.description}</p>
                          <div className="flex flex-wrap gap-4">
                            {item.speakers.map((speaker, speakerIndex) => (
                              <div key={speakerIndex} className="flex items-center bg-[#79a7b6] text-white p-2 rounded-lg">
                                <Image
                                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kagome_symbol_circle-nXt3WkJj062REZ1jLWrRPFtFhsiiIG.png"
                                  alt={speaker.name}
                                  width={40}
                                  height={40}
                                  className="rounded-full mr-2"
                                />
                                <div>
                                  <p className="font-bold">{speaker.name}</p>
                                  {speaker.info && <p className="text-sm">{speaker.info}</p>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {item.sessions.map((session, sessionIndex) => (
                            <div key={sessionIndex} className="bg-[#f4f4f4] p-4 rounded-lg">
                              <span className="inline-block bg-[#ffde59] text-[#545454] px-3 py-1 rounded-full text-sm mb-2">
                                {session.event}
                              </span>
                              <h3 className="text-xl font-bold mb-2">{session.title}</h3>
                              <p className="mb-4">{session.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {session.speakers.map((speaker, speakerIndex) => (
                                  <div key={speakerIndex} className="flex items-center bg-[#79a7b6] text-white p-2 rounded-lg">
                                    <Image
                                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kagome_symbol_circle-nXt3WkJj062REZ1jLWrRPFtFhsiiIG.png"
                                      alt={speaker.name}
                                      width={40}
                                      height={40}
                                      className="rounded-full mr-2"
                                    />
                                    <div>
                                      <p className="font-bold">{speaker.name}</p>
                                      {speaker.info && <p className="text-sm">{speaker.info}</p>}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
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

              <p className="mb-4">申し込み締め切り：参加希望人数が一定数に達した際に申し込みを締め切らせていただきます。</p>

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
                <MapPin className="mr-2" />
                <span>グロービス経営大学院 横浜・特設キャンパス<br />横浜市西区南幸１丁目１−１ JR横浜タワ 14F</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2" />
                <span>10:00 - 17:15</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#79a7b6] text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">お問い合わせ: kamome_2024.stu@globis.ac.jp</p>
          <p>&copy; 2024 かもめ会議. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}