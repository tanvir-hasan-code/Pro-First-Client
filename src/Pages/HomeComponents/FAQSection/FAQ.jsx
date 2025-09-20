import React from "react";
import { GoArrowUpRight } from "react-icons/go";

const FAQ = () => {
  return (
    <div className=" my-10">
      <h1 className="text-4xl font-bold text-primary text-center">
        Frequently Asked Question (FAQ)
      </h1>
      <p className="text-gray-600 text-center max-w-lg md:max-w-2xl mx-auto my-4  md:text-base text-sm">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        Achieve proper alignment, reduce pain, and strengthen your body with
        ease!
      </p>
      <section className="w-11/12 mx-auto grid gap-2 lg:w-8/12">
        <div className="collapse collapse-arrow bg-base-300 border border-white">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title font-semibold">
            How does this posture corrector work?
          </div>
          <div className="collapse-content text-sm">
            A posture corrector works by providing support and gentle alignment
            to your shoulders, back, and spine, encouraging you to maintain
            proper posture throughout the day. Here’s how it typically
            functions: A posture corrector works by providing support and gentle
            alignment to your shoulders.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-300 border border-white">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            Is it suitable for all ages and body types?
          </div>
          <div className="collapse-content text-sm">
            Yes, it’s designed to be adjustable and comfortable, making it
            suitable for all ages and body types. Anyone can use it safely for
            better posture and support.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-300 border border-white">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            Does it really help with back pain and posture improvement?
          </div>
          <div className="collapse-content text-sm">
            Yes, it supports proper spine alignment to relieve back pain. It
            gently trains your body to maintain a healthier posture. With
            consistent use, many users notice reduced discomfort and improved
            posture habits.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-300 border border-white">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            Does it have smart features like vibration alerts?
          </div>
          <div className="collapse-content text-sm">
            Yes, some models come with smart features like gentle vibration
            alerts. These alerts remind you to correct your posture whenever you
            slouch. It helps build better posture habits effortlessly over time.
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-300 border border-white">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            How will I be notified when the product is back in stock?
          </div>
          <div className="collapse-content text-sm">
            You can sign up with your email or phone number on the product page.
            We’ll send you an instant notification as soon as it’s back in
            stock.
          </div>
        </div>
		  </section>
		  <div className="my-10">
			  <button className="btn bg-[#CAEB66] flex gap-3 mx-auto items-center btn-primary">See More FAQ's <GoArrowUpRight className="p-1 bg-white rounded-full" size={26}/></button>
		  </div>
    </div>
  );
};

export default FAQ;
